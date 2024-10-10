## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure
```
next-app/
├── app/
│   ├── api/
│   │   └── hello/
│   │       └── route.ts          # Example API route (for API endpoints)
│   ├── dashboard/
│   │   ├── page.tsx              # Page component for /dashboard route
│   │   └── layout.tsx            # Layout for /dashboard route
│   ├── about/
│   │   └── page.tsx              # Page component for /about route
│   ├── layout.tsx                # Global layout for the entire app
│   ├── page.tsx                  # Home page component for /
│   ├── error.tsx                 # Custom error page
│   └── globals.css               # Global CSS
├── components/
│   ├── Navbar.tsx                # Navbar component
│   └── Footer.tsx                # Footer component
├── public/
│   └── favicon.ico               # Favicon and other static files
├── styles/
│   ├── Home.module.css           # Module CSS for Home page
│   └── globals.css               # Global CSS file
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── tsconfig.json                 # TypeScript configuration (if using TypeScript)
```


1. Added Packages

    ### Three JS(For 3D rendering)
    ```
    npm install --save three
    ```

    ### Shadcn UI Lib
    ```
    npx shadcn@latest init
    ```

    #### Added Components

    1. Card View
    ```
    npx shadcn@latest add card
    ```

    2. Inputs
    ```
    npx shadcn@latest add input
    ``` 

    3. Progress
    ```
    npx shadcn@latest add progress
    ```

    4. Resizable
    ```
    npx shadcn@latest add resizable
    ```

    5. Slider
    ```
    npx shadcn@latest add slider
    ```

    6. Toast
    ```
    npx shadcn@latest add sonner
    ```

    7. Toggle switch
    ```
    npx shadcn@latest add switch
    ```

    8. Button
    ```
    npx shadcn@latest add button
    ```

    9. Aspect-ratio
    ```
    npx shadcn@latest add aspect-ratio
    ```

    10. Breadcrumb
    ```
    npx shadcn@latest add breadcrumb
    ```

```
    servo 1    :   :     servo 2
               /   \
    arm 1 top /     \     arm 2 top
             /       \
            .         .
             \       /
              \     /
               \   /
arm 1 bottom    \ /     arm 2 bottom
                 .

consider (.) as free rotatable pint to servo 1 and 2 angle changes.
consider (:) as a servo motor.
```