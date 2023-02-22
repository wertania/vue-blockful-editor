# Vue-Blockful-Editor

A small block editor library for Vue3.
All blocks are rendered by Block-Plugins which can be extended for custom projects.

## Blocks

Each "Block" item is a Plugin which delivers a "viewer" mode and "editor" mode.
Custom Plugins can be implemented very easy.

Out of the box Vue-Blockful-Editor has these Block Plugins:

- Paragraph
- Delimiter
- Embed (iFrame)
- Header (h1,h2,h3,h4,h5,h6)
- Paragraph (text-size: 1-5, align: center, left, right)
- plainhtml (code)
- RichText (based on TipTap)

## Images

Images can be added in three ways: upload by clipboard, upload by File or only give a URL as Link.

### Image upload

Images must be uploaded by a custom function which returns the new URL of the image as an URL<string>.

```
/**
 * demo function to upload a file to a server
 */
export const uploadCustomFunction = async (file: Blob): Promise<string> => {
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
