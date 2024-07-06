class SetupTeardownIncluder {
    constructor(pageData) {
      this.pageData = pageData;
      this.testPage = pageData.getWikiPage();
      this.pageCrawler = this.testPage.getPageCrawler();
      this.newPageContent = '';
      this.isSuite = false;
    }
  
    static async render(pageData, isSuite = false) {
      return new SetupTeardownIncluder(pageData).render(isSuite);
    }
  
    async render(isSuite) {
      this.isSuite = isSuite;
      if (await this.isTestPage()) {
        await this.includeSetupAndTeardownPages();
      }
      return this.pageData.getHtml();
    }
  
    async isTestPage() {
      return this.pageData.hasAttribute('Test');
    }
  
    async includeSetupAndTeardownPages() {
      await this.includeSetupPages();
      await this.includePageContent();
      await this.includeTeardownPages();
      await this.updatePageContent();
    }
  
    async includeSetupPages() {
      if (this.isSuite) await this.includeSuiteSetupPage();
      await this.includeSetupPage();
    }
  
    async includeSuiteSetupPage() {
      await this.include(SuiteResponder.SUITE_SETUP_NAME, '-setup');
    }
  
    async includeSetupPage() {
      await this.include('SetUp', '-setup');
    }
  
    async includePageContent() {
      this.newPageContent += this.pageData.getContent();
    }
  
    async includeTeardownPages() {
      await this.includeTeardownPage();
      if (this.isSuite) await this.includeSuiteTeardownPage();
    }
  
    async includeTeardownPage() {
      await this.include('TearDown', '-teardown');
    }
  
    async includeSuiteTeardownPage() {
      await this.include(SuiteResponder.SUITE_TEARDOWN_NAME, '-teardown');
    }
  
    async updatePageContent() {
      this.pageData.setContent(this.newPageContent);
    }
  
    async include(pageName, arg) {
      const inheritedPage = await this.findInheritedPage(pageName);
      if (inheritedPage != null) {
        const pagePathName = await this.getPathNameForPage(inheritedPage);
        this.buildIncludeDirective(pagePathName, arg);
      }
    }
  
    async findInheritedPage(pageName) {
      return PageCrawlerImpl.getInheritedPage(pageName, this.testPage);
    }
  
    async getPathNameForPage(page) {
      const pagePath = this.pageCrawler.getFullPath(page);
      return PathParser.render(pagePath);
    }
  
    buildIncludeDirective(pagePathName, arg) {
      this.newPageContent += `\n!include ${arg} .${pagePathName}\n`;
    }
  }
  