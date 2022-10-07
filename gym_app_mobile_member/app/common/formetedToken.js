export const getFormattedToken = (token) => {
    const formattedToken = {
        headers: {
            // 'Content-Type': 'application/json',
            "x-auth-token": token,
        },
    };

    return formattedToken;
};