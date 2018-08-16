# coding:utf-8
from DataOutput import DataOutput
from HtmlDownloader import HtmlDownloader
from HtmlParser import HtmlParser
from URLManager import URLManager

class SpiderMan(object):
    def __init__(self):
        self.manager = URLManager()
        self.downloader = HtmlDownloader()
        self.parser = HtmlParser()
        self.output = DataOutput()
    def crawl(self, root_url):
        text = self.downloader.download(root_url)
        new_urls = self.parser.parser_json(root_url, text)
        self.manager.add_new_urls(new_urls)
        while(self.manager.has_new_url() and self.manager.old_url_size() < 10):
            try:
                new_url = self.manager.get_new_url()
                html = self.downloader.download(new_url)
                data = self.parser.parser(new_url, html)
                self.output.store_data(data)
            except Exception, e:
                print "crawl failed"
        self.output.output()
if __name__ == '__main__':
    spider_man = SpiderMan()
    spider_man.crawl("https://www3.nhk.or.jp/news/easy/top-list.json")
