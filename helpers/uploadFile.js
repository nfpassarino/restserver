const uploadFile = (
    file,
    validExtensions = ['txt', 'png', 'jpg', 'jpeg'],
    folder = ''
) => {
    return new Promise((resolve, reject) => {
        const trimmedName = file.name.split('.');
        const fileExtension = trimmedName[trimmedName.length - 1];
        if (!validExtensions.includes(fileExtension)) {
            return reject(
                `Extensión ${fileExtension} no permitida [${validExtensions}]`
            );
        }

        const tempName = `${uuidv4()}.${fileExtension}`;
        const uploadPath = path.join(
            __dirname,
            '../uploads/',
            folder,
            tempName
        );

        file.mv(uploadPath, (err) => {
            if (err) reject(err);
            resolve(uploadPath);
        });
    });
};

module.exports = {
    uploadFile,
};
