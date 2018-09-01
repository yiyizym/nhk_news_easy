from bs4 import BeautifulSoup

html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<h1 class="article-main__title">
              「<ruby>吉田<rt>よしだ</rt></ruby>の<ruby>火<rt>ひ</rt></ruby><ruby>祭<rt>まつ</rt></ruby>り」　<ruby>富士山<rt>ふじさん</rt></ruby>の<ruby>登山<rt>とざん</rt></ruby>の<ruby>季節<rt>きせつ</rt></ruby>がもうすぐ<ruby>終<rt>お</rt></ruby>わる
            </h1>
"""

soup = BeautifulSoup(html_doc, 'html.parser')

# content = soup.find('h1', class_='article-main__title').decode_contents().replace('\n', '')
content = str(soup.find('h1', class_='article-main__title')).replace('\n', '')
print(content)