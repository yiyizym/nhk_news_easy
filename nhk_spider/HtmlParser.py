import re
import simplejson
from bs4 import BeautifulSoup

class HtmlParser(object):
    def parser(self, page_url, html_cont):
        if page_url is None or html_cont is None:
            return
        soup = BeautifulSoup(html_cont, 'html.parser')
        new_data = self._get_new_data(page_url, soup)
        return new_data
    def _get_new_data(self, page_url, soup):
        data = {}
        data['url'] = page_url
        data['title'] = str(soup.find('h1', class_='article-main__title')).replace('\n', '')
        data['date'] = soup.find('p', class_='article-main__date').get_text()
        data['article'] = str(soup.find('div', class_='article-main__body')).replace('\n', '')
        return data
    def paer_url(self, page_url, response):
        pattern = re.compile(r'')
        urls = pattern.findall(response)
        if urls != None:
            return list(set(urls))
        else:
            return None
    def parser_json(self, page_url, response):
        if response != None:
            value = simplejson.loads(response)
            try:
                urls = set()
                for item in value:
                    id = item.get('news_id')
                    url = 'https://www3.nhk.or.jp/news/easy/' + id + '/' + id + '.html'
                    urls.add(url)
                return urls
            except Exception as e:
                print(e)
                return []