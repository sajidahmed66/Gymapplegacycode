export const getFootInchFromCentimeter = (heightCentimeter) => {
    const heightInchFromCentimeter = parseFloat(heightCentimeter) / 2.54;
    const heightFoot = parseInt(parseFloat(heightInchFromCentimeter) / 12);
    let heightInch =
        parseFloat(heightInchFromCentimeter) - 12 * parseInt(heightFoot);

    heightInch = Number(heightInch.toFixed(2));

    const convertedHeight = { heightFoot, heightInch };

    return convertedHeight;
};

export const getCentimeterFromFootInch = (heightFoot, heightInch) => {
    const heightCentimeter =
        parseFloat(heightFoot) * 30.48 + parseFloat(heightInch) * 2.54;
    const convertedHeight = { heightCentimeter };

    return convertedHeight;
};