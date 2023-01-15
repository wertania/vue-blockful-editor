
// default upload routine

export const uploadFromClipboard = async (url: string, formDataKey: string = "value") => {
    // get file from clipboard
    const clipboardItems = await navigator.clipboard.read();
    // console.log(clipboardItems);

    if (clipboardItems[0] == null) {
        console.log("no clipboard item");
        return;
    }

    const clipboardItem = clipboardItems[0];
    // check if file is image
    if (!clipboardItem.types.includes("image/png")) {
        console.log("no image");
        return;
    }

    // upload file
    const blob = await clipboardItem.getType("image/png");
    const formData = new FormData();
    formData.append(formDataKey, blob);
    await fetch(url, {
        method: "POST",
        body: formData,
    });
};