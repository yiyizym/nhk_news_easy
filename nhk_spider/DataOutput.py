# coding:utf-8
import codecs

class DataOutput(object):
    def __init__(self):
        self.datas=[]
        # 拿到 totalNumber 
        # 取决是在尾部追加，还是新开一个文件
        # 最后再 update totalNumber
    def store_data(self,data):
        if data is None:
            return
        self.datas.append(data)
    def output(self):
        fout = codecs.open('../src/js/posts.js', 'w', encoding='utf-8')
        fout.write('const posts = [\n')
        for data in self.datas:
            fout.write("\n{\n date:'%s',\n title:'<div>%s</div>',\n article:'<div>%s</div>',\n}," % (data['date'], data['title'], data['article']))
        fout.write(']\n')
        fout.write('export default posts\n')
        fout.close()
