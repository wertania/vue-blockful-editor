
## Know Issues
nice-to-have:
Spalten Widget
iframe Komponenten erst anzeigen, wenn fertig geladen
plugin für MD (MIT)
selectedItem für side-menu (> plotter side-mode > den man dann generell nutzen könnte)
per tiptap per color highlight ggf Messdas werte rein bekommen?!

## Depencies
- Vue3
- Mitt
- Tailwind CSS
- TipTap RichText Editor (Plugin Richtext)

## Image upload

Images must be uploaded by a custom function which returns the new URL of the image as an URL.
```
/**
 * demo function to upload a file to a server
 * upload directly from clipboard to server url via FormData
 */
export const uploadFromClipboard = async (file: Blob): Promise<string> => {
    // get file from clipboard
    const formData = new FormData();
    formData.append("file", file);
    const r = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    });
    const response = await r.json();
    // dev server returns an object with the url of the uploaded file
    return response.url;
};
```

## Development server for image update

Litte dev server to test image upload via FormData.
```
node .\dev-server\index.cjs
```