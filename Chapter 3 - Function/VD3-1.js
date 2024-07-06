function testableHtml(pageData, includeSuiteSetup) {
    let wikiPage = pageData.getWikiPage();
    let buffer = [];

    if (pageData.hasAttribute("Test")) {

        if (includeSuiteSetup) {
            let suiteSetup = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_SETUP_NAME, wikiPage);
            if (suiteSetup !== null) {
                let pagePath = suiteSetup.getPageCrawler().getFullPath(suiteSetup);
                let pagePathName = PathParser.render(pagePath);
                buffer.push("!include -setup ." + pagePathName + "\n");
            }
        }

        let setup = PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
        if (setup !== null) {
            let setupPath = wikiPage.getPageCrawler().getFullPath(setup);
            let setupPathName = PathParser.render(setupPath);
            buffer.push("!include -setup ." + setupPathName + "\n");
        }
    }

    buffer.push(pageData.getContent());

    if (pageData.hasAttribute("Test")) {
        let teardown = PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
        if (teardown !== null) {
            let tearDownPath = wikiPage.getPageCrawler().getFullPath(teardown);
            let tearDownPathName = PathParser.render(tearDownPath);
            buffer.push("\n" + "!include -teardown ." + tearDownPathName + "\n");
        }

        if (includeSuiteSetup) {
            let suiteTeardown = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_TEARDOWN_NAME, wikiPage);
            if (suiteTeardown !== null) {
                let pagePath = suiteTeardown.getPageCrawler().getFullPath(suiteTeardown);
                let pagePathName = PathParser.render(pagePath);
                buffer.push("!include -teardown ." + pagePathName + "\n");
            }
        }
    }

    pageData.setContent(buffer.join(''));
    return pageData.getHtml();
}
