function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
    return new Promise((resolve, reject) => {
        try {
            if (isTestPage(pageData)) {
                includeSetupAndTeardownPages(pageData, isSuite)
                    .then(() => {
                        resolve(pageData.getHtml());
                    })
                    .catch(reject);
            } else {
                resolve(pageData.getHtml());
            }
        } catch (error) {
            reject(error);
        }
    });
}