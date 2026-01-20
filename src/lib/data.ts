export interface Article {
  id: string;
  title: string;
  description: string;
  category: "looksmaxxing" | "ancestral-eating";
  level: number;
  duration: string;
  content: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

export const categories: Category[] = [
  {
    id: "looksmaxxing",
    title: "Looksmaxxing",
    description: "Master the art and science of maximizing your physical appearance through proven techniques.",
    icon: "user",
    articleCount: 24,
  },
  {
    id: "ancestral-eating",
    title: "Ancestral Eating",
    description: "Learn to eat like your ancestors for optimal health, energy, and body composition.",
    icon: "salad",
    articleCount: 18,
  },
];

export const articles: Article[] = [
  // Looksmaxxing articles
  {
    id: "lm-1",
    title: "Introduction to Looksmaxxing",
    description: "Understanding the fundamentals of physical self-improvement and why it matters.",
    category: "looksmaxxing",
    level: 1,
    duration: "5 min",
    content: `# Introduction to Looksmaxxing

Looksmaxxing is the practice of maximizing your physical appearance through various methods. This isn't about vanity—it's about becoming the best version of yourself.

## Why Looksmaxxing Matters

Your appearance affects many aspects of life:
- First impressions and social interactions
- Professional opportunities
- Self-confidence and mental health
- Overall life satisfaction

## The Three Pillars

1. **Skincare** - The foundation of any looksmaxxing journey
2. **Bone Structure** - Mewing, posture, and facial development
3. **Body Composition** - Building muscle and losing fat

## Getting Started

The key is to start with the basics and build from there. Don't try to do everything at once.`,
  },
  {
    id: "lm-2",
    title: "Skincare Fundamentals",
    description: "Build a solid skincare routine that actually works for clear, healthy skin.",
    category: "looksmaxxing",
    level: 1,
    duration: "8 min",
    content: `# Skincare Fundamentals

Clear skin is the foundation of looking your best. Here's how to build a routine that works.

## The Basic Routine

### Morning
1. Gentle cleanser
2. Vitamin C serum
3. Moisturizer
4. Sunscreen (most important!)

### Evening
1. Oil cleanser (if you wear sunscreen)
2. Water-based cleanser
3. Treatment (retinol, etc.)
4. Moisturizer

## Key Ingredients to Know

- **Retinol** - Gold standard for anti-aging
- **Vitamin C** - Brightening and protection
- **Niacinamide** - Pore minimizing
- **Hyaluronic Acid** - Hydration

## Common Mistakes

- Over-exfoliating
- Skipping sunscreen
- Using too many products at once`,
  },
  {
    id: "lm-3",
    title: "The Science of Mewing",
    description: "Proper tongue posture and its effects on facial development.",
    category: "looksmaxxing",
    level: 2,
    duration: "10 min",
    content: `# The Science of Mewing

Mewing is the practice of proper tongue posture. Here's the science behind it.

## What is Mewing?

Mewing involves:
- Placing the entire tongue on the roof of your mouth
- Keeping lips together
- Teeth lightly touching or slightly apart
- Breathing through your nose

## The Theory

Proper tongue posture may influence:
- Facial development over time
- Jawline definition
- Breathing patterns
- Overall facial aesthetics

## How to Mew Correctly

1. Say the word "sing" and notice where your tongue goes
2. Keep your tongue in that position
3. Apply gentle pressure upward
4. Maintain this position throughout the day`,
  },
  {
    id: "lm-4",
    title: "Posture Optimization",
    description: "Fix your posture for better appearance and health.",
    category: "looksmaxxing",
    level: 2,
    duration: "7 min",
    content: `# Posture Optimization

Good posture makes you look taller, more confident, and more attractive.

## The Ideal Posture

- Ears aligned over shoulders
- Shoulders back and down
- Core engaged
- Weight distributed evenly

## Common Posture Problems

### Forward Head Posture
Caused by looking at screens. Fix with chin tucks.

### Rounded Shoulders
Caused by sitting. Fix with wall angels and rows.

### Anterior Pelvic Tilt
Caused by sitting. Fix with hip flexor stretches.

## Daily Exercises

1. Chin tucks - 3x15 reps
2. Wall angels - 3x10 reps
3. Hip flexor stretch - 2x30 seconds each side`,
  },
  {
    id: "lm-5",
    title: "Advanced Facial Exercises",
    description: "Targeted exercises to enhance facial muscle definition.",
    category: "looksmaxxing",
    level: 3,
    duration: "12 min",
    content: `# Advanced Facial Exercises

Take your facial aesthetics to the next level with targeted exercises.

## Jaw Exercises

### Jawzrsize Alternative
- Chew mastic gum on each side
- Start with 10 minutes, build up gradually
- Don't overdo it—rest days are important

### Neck Curls
- Lie on your back, head hanging off bed
- Curl your head up slowly
- 3 sets of 15-20 reps

## Cheekbone Enhancement

### Cheek Raises
- Smile as wide as possible
- Push cheeks up with fingers
- Hold for 10 seconds

## Important Notes

- Be patient—results take months
- Don't cause TMJ issues by overdoing jaw work
- Combine with proper nutrition`,
  },
  // Ancestral Eating articles
  {
    id: "ae-1",
    title: "What is Ancestral Eating?",
    description: "Discover the principles behind eating like our ancestors for optimal health.",
    category: "ancestral-eating",
    level: 1,
    duration: "6 min",
    content: `# What is Ancestral Eating?

Ancestral eating is about returning to the foods humans evolved to eat.

## The Core Principle

Our genes haven't changed much in 10,000 years, but our diet has changed dramatically. By eating foods closer to what our ancestors ate, we can optimize our health.

## What to Eat

- **Meat** - Especially organ meats
- **Fish** - Wild-caught, fatty fish
- **Eggs** - Pasture-raised
- **Vegetables** - Especially fermented
- **Fruits** - In moderation
- **Nuts and Seeds** - Properly prepared

## What to Avoid

- Processed foods
- Seed oils (canola, soybean, etc.)
- Added sugars
- Most grains (especially refined)`,
  },
  {
    id: "ae-2",
    title: "The Power of Organ Meats",
    description: "Why liver and other organs are nature's multivitamin.",
    category: "ancestral-eating",
    level: 1,
    duration: "8 min",
    content: `# The Power of Organ Meats

Organ meats are the most nutrient-dense foods on the planet.

## Liver: Nature's Multivitamin

Beef liver contains:
- Vitamin A (retinol) - 10x RDA per serving
- B12 - Essential for energy
- Iron - Highly bioavailable form
- Copper, zinc, and more

## Other Organs to Try

### Heart
- Rich in CoQ10
- Great source of B vitamins
- Tastes like steak

### Kidney
- High in B12 and selenium
- Great for detoxification support

## How to Start

If you're new to organs:
1. Start with heart (mildest taste)
2. Try liver pâté
3. Mix ground liver into ground beef
4. Freeze liver in pill-sized pieces`,
  },
  {
    id: "ae-3",
    title: "Understanding Seed Oils",
    description: "Why industrial seed oils are harmful and what to use instead.",
    category: "ancestral-eating",
    level: 2,
    duration: "9 min",
    content: `# Understanding Seed Oils

Seed oils are one of the most harmful additions to the modern diet.

## What Are Seed Oils?

Industrial oils extracted from seeds:
- Canola/Rapeseed oil
- Soybean oil
- Corn oil
- Sunflower oil
- Safflower oil

## Why They're Harmful

1. **High in Omega-6** - Creates inflammation
2. **Oxidation** - Damaged during processing
3. **Not ancestral** - Only existed for ~100 years

## Better Alternatives

- **Butter/Ghee** - Saturated, stable
- **Tallow** - Beef fat, traditional
- **Olive Oil** - Cold-pressed, for low heat
- **Coconut Oil** - Great for cooking

## How to Avoid

- Cook at home more
- Read labels carefully
- Ask restaurants about oils used`,
  },
  {
    id: "ae-4",
    title: "Nose-to-Tail Eating",
    description: "Learn to eat the whole animal for complete nutrition.",
    category: "ancestral-eating",
    level: 2,
    duration: "10 min",
    content: `# Nose-to-Tail Eating

Our ancestors didn't just eat muscle meat—they ate everything.

## Why Nose-to-Tail?

- Complete nutrition profile
- Less waste
- More sustainable
- Often cheaper
- Traditional practice

## Parts to Incorporate

### Bones
- Make bone broth
- Rich in collagen and minerals
- Great for gut health

### Fat
- Render tallow from beef fat
- Cook with it
- Highly stable

### Organs
- Liver, heart, kidney
- See our organ meats article

## Getting Started

1. Make bone broth weekly
2. Save cooking fats
3. Try one new organ per month
4. Find a local butcher`,
  },
  {
    id: "ae-5",
    title: "Optimizing Digestion",
    description: "Improve your gut health for better nutrient absorption.",
    category: "ancestral-eating",
    level: 3,
    duration: "11 min",
    content: `# Optimizing Digestion

Good digestion is essential for getting nutrients from your food.

## Signs of Poor Digestion

- Bloating after meals
- Gas
- Heartburn
- Irregular bowel movements
- Fatigue after eating

## How to Improve

### Eat Mindfully
- Chew thoroughly (30+ times per bite)
- Don't drink too much with meals
- Eat in a relaxed state

### Support Stomach Acid
- Apple cider vinegar before meals
- Don't overeat
- Avoid antacids if possible

### Fermented Foods
- Sauerkraut
- Kimchi
- Kefir
- Kombucha

## Advanced Strategies

- Digestive enzymes with meals
- Bitter herbs before eating
- Time-restricted eating`,
  },
];

export const getArticlesByCategory = (categoryId: string): Article[] => {
  return articles.filter((article) => article.category === categoryId);
};

export const getArticleById = (articleId: string): Article | undefined => {
  return articles.find((article) => article.id === articleId);
};

export const isArticleUnlocked = (article: Article, completedArticles: string[]): boolean => {
  const categoryArticles = articles.filter((a) => a.category === article.category);
  const articleIndex = categoryArticles.findIndex((a) => a.id === article.id);
  
  // First article is always unlocked
  if (articleIndex === 0) return true;
  
  // Check if previous article is completed
  const previousArticle = categoryArticles[articleIndex - 1];
  return completedArticles.includes(previousArticle.id);
};
