import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: cookbookEntry[] = [];

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  // TODO: implement me
  return recipeName;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  // TODO: implement me
  const entry = req.body as cookbookEntry &
    Partial<recipe> &
    Partial<ingredient>;

  // Condition 1: Validate type
  if (!entry.name || typeof entry.name !== "string") {
    return res.status(400).send("Entry name must be a non-empty string.");
  }
  if (entry.type !== "recipe" && entry.type !== "ingredient") {
    return res
      .status(400)
      .send("Invalid type. Must be 'recipe' or 'ingredient'.");
  }

  // Condition 2: If ingredient, validate cookTime
  if (entry.type === "ingredient") {
    if (typeof entry.cookTime !== "number" || entry.cookTime < 0) {
      return res.status(400).send("cookTime must be a non-negative number.");
    }
  }

  // Condition 3: Ensure entry names are unique
  if (cookbook.some((e) => e.name === entry.name)) {
    return res.status(400).send("Entry name already exists.");
  }

  // Condition 4: If recipe, validate requiredItems
  if (entry.type === "recipe") {
    if (
      !Array.isArray(entry.requiredItems) ||
      entry.requiredItems.length === 0
    ) {
      return res
        .status(400)
        .send("Recipe must have at least one required item.");
    }

    const requiredItemNames = new Set();
    for (const item of entry.requiredItems) {
      if (!item.name || typeof item.name !== "string") {
        return res
          .status(400)
          .send("Each required item must have a valid name.");
      }
      if (requiredItemNames.has(item.name)) {
        return res
          .status(400)
          .send(`Duplicate required item name: ${item.name}`);
      }
      requiredItemNames.add(item.name);

      if (typeof item.quantity !== "number" || item.quantity <= 0) {
        return res
          .status(400)
          .send("Each required item must have a quantity greater than 0.");
      }
    }
  }

  // Add entry to cookbook
  cookbook.push(entry);
  return res.status(200).send("Entry added successfully.");
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Response) => {
  const recipeName = req.query.name as string;
  // TODO: implement me
  // Find the recipe in the cookbook
  const recipe = cookbook.find(
    (entry) => entry.name === recipeName && entry.type === "recipe"
  ) as recipe;

  if (!recipe) {
    return res.status(400).body("Recipe not found.");
  }

  // Create required items object
  const requiredItems: Record<string, number> = {};
  let cookTime = 0;

  for (const item of recipe.requiredItems) {
    requiredItems[item.name] = item.quantity;

    // Find the ingredient in the cookbook
    const ingredient = cookbook.find(
      (entry) => entry.name === item.name && entry.type === "ingredient"
    ) as ingredient;

    if (!ingredient) {
      return res
        .status(400)
        .body(`Missing ingredient: ${item.name} for recipe: ${recipeName}`);
    }

    cookTime += ingredient.cookTime * item.quantity;
  }

  // Construct response
  const result = {
    name: recipe.name,
    requiredItems,
    cookTime,
  };

  return res.json(result);
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
