# DinnerClub Deployment Steps
-----------------------------


### Build.js Script

- Requires `JAVA SDK`, `nodejs`

- Run: `c:\dc\build> node build.js`

- Outputs to `c:\dc\PROD\` folder



### Manual Steps

1. Delete `\PROD` folder
2. Run **require.js** optimizer:
    ```
    c:\dc\build> node r.js -o build.js
    ```
3. Run **SmartSprites**:
    ```
    c:\dc\SmartSprites> smartsprites --css-files c:\dc\PROD\style\*.css
    ```
4. Replace stylesheets in **\PROD**
    - **\PROD\index.html**:
      `'style/style.css'` -> `'style/style-sprite.css'`
    - **\PROD\scripts\about.js**:
      `'style/about.css'` -> `'style/about-sprite.css'`



### TODO

- Use non-sprite instead of send.png (about.css)
- Place **SmartSprites** in a common accessible location
- Create a batch file for production:
    - Run all optimization\build scripts into **PROD** folder
    - Use SPRITE css file-names automatically
    - Delete unnecessary files from **PROD**
        - Non-sprite images\css
        - Un-used non-combined js files (text.js)
        - **build** folder
        - **.idea** folder (webstorm folder)
        - Exclude **models** folder?