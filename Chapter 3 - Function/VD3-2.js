function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
    return new Promise((resolve, reject) => {
        try {
            let isTestPage = pageData.hasAttribute("Test");

            if (isTestPage) {
                let testPage = pageData.getWikiPage();
                let newPageContent = "";

                includeSetupPages(testPage, newPageContent, isSuite)
                    .then(() => {
                        newPageContent += pageData.getContent();

                        return includeTeardownPages(testPage, newPageContent, isSuite);
                    })
                    .then(() => {
                        pageData.setContent(newPageContent);
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
