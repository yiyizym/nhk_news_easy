# coding:utf-8
import codecs
import math
import simplejson

class DataOutput(object):
    def __init__(self):
        self.total_number = self.get_former_total_number()
        self.datas = self.read_current_file()

    def get_former_total_number(self):
        with codecs.open('../docs/data/totalNumber', 'r', 'utf-8') as f:
            return int(f.read())

    def read_current_file(self):
        current_file_name = "%s.json" % (math.ceil(self.total_number / 10))
        with codecs.open("../docs/data/%s" % current_file_name,'r', 'utf-8') as f:
            return simplejson.loads(f.read())

    def write_current_total_number(self):
        with codecs.open('../docs/data/totalNumber', 'w') as f:
            current_total_number = len(self.datas) + self.total_number - (self.total_number % 10)
            f.write(str(current_total_number))

    def store_data(self,data):
        if data is None:
            return
        self.datas.append(data)

    def output(self):
        self.write_current_total_number()
        current_number = math.ceil(self.total_number / 10)
        file_content = self.datas[:10]
        self.datas = self.datas[10:]

        while(len(file_content) != 0):
            with codecs.open("../docs/data/%s.json" % current_number, 'w', 'utf-8') as f:
                f.write(simplejson.dumps(file_content, ensure_ascii=False))
            current_number += 1
            file_content = self.datas[:10]
            self.datas = self.datas[10:]
