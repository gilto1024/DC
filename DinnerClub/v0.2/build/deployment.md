# DinnerClub Deployment Steps
-----------------------------

### Manual Steps

1. Delete `\PROD` folder
2. Run **require.js** optimizer:
    ```
    c:\dc\v42\build> node r.js -o build.js
    ```
3. Run **SmartSprites**:
    ```
    c:\dc\SmartSprites> smartsprites --css-files c:\dc\v42\PROD\style\*.css
    ```
4. Replace stylesheets in **\PROD**
    - **\PROD\index.html**:
      `'style/style.css'` -> `'style/style-sprite.css'`
    - **\PROD\scripts\about.js**:
      `'style/about.css'` -> `'style/about-sprite.css'`
5. Reposition hover\loader images in about-sprite.css (need to replace the send.png sprite with individual images)


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