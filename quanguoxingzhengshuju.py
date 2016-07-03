#coding:utf-8
from pypinyin import pinyin, lazy_pinyin
import pypinyin
import csv

def pinyinFirst(name):
    print name
    pinyin = lazy_pinyin(name)
    retPinyin = []
    for element in pinyin:
        retPinyin =retPinyin + [element[0]]

    return retPinyin

def listToUtf8(list):
    str = ''
    for element in list:
        str =str+element+'\''
    str = str[:-1]    
    return str.encode("UTF-8")

f = open('全国行政数据', 'r')
provinceCode = ''
city = ''
pinyin = ''
with open('province.csv','w') as csvfile:
    spamwriter = csv.writer(csvfile,delimiter=';')
    spamwriter.writerow(['id','province_id', 'province_name','pinyin','pinyin_first'])

with open('city.csv','w') as csvfile:
    spamwriter = csv.writer(csvfile,delimiter=';')
    spamwriter.writerow(['id','province_id','city_id', 'city_name','pinyin','pinyin_first'])

result = list()
provCount = 0
cityCount = 0
for line in open('全国行政数据'):
    line = f.readline()
    line=line.strip('\n')
    if len(line) != 0:
        try:
            num = int(line)
        except Exception,e:
            #print e
            continue
        if (num%10000)==0:
            pass
            provCount += 1
            code = line
            name = f.readline()
            provinceCode = code
            print('省/自治区编号：'+code.decode('string_escape')+' 名称:'+name)
            with open('province.csv','a') as csvfile:
                spamwriter = csv.writer(csvfile,delimiter=';')
                spamwriter.writerow([provCount,code, name.strip('\n'),listToUtf8(lazy_pinyin(unicode(name.strip('\n'),"utf-8"))),listToUtf8(pinyinFirst(unicode(name.strip('\n'),"utf-8")))])

        elif (num%1000)==0 :
            pass
            code = line
            name = f.readline()
            tempName = name.strip('\n')

            if tempName=='县' or tempName=='市辖区' or tempName=='城区' or tempName=='省直辖县级行政区划'or tempName=='自治区直辖县级行政区划':
                continue

            cityCount += 1
            print('省直辖县级行政区划编号：'+line.decode('string_escape')+' 名称:'+name)
            with open('city.csv','a') as csvfile:
                spamwriter = csv.writer(csvfile,delimiter=';')
                spamwriter.writerow([cityCount,provCount,num, name.strip('\n'),listToUtf8(lazy_pinyin(unicode(name.strip('\n'),"utf-8"))),listToUtf8(pinyinFirst(unicode(name.strip('\n'),"utf-8")))])
        elif (num%100)==0:
            pass
            code = line
            name = f.readline()
            tempName = name.strip('\n')

            if tempName=='县' or tempName=='市辖区' or tempName=='城区' or tempName=='省直辖县级行政区划' or tempName=='自治区直辖县级行政区划':
                continue

            cityCount += 1
            print('地级市编号：'+line.decode('string_escape')+' 名称:'+name)
            with open('city.csv','a') as csvfile:
                spamwriter = csv.writer(csvfile,delimiter=';')
                spamwriter.writerow([cityCount,provCount,num, name.strip('\n'),listToUtf8(lazy_pinyin(unicode(name.strip('\n'),"utf-8"))),listToUtf8(pinyinFirst(unicode(name.strip('\n'),"utf-8")))])
        else:
            pass
            code = line
            name = f.readline()
            tempName = name.strip('\n')

            if tempName=='县' or tempName=='市辖区' or tempName=='城区' or tempName=='省直辖县级行政区划'or tempName=='自治区直辖县级行政区划':
                continue

            cityCount += 1
            print('县级市编号：'+code.decode('string_escape')+' 名称:'+name)
            with open('city.csv','a') as csvfile:
                spamwriter = csv.writer(csvfile,delimiter=';')
                spamwriter.writerow([cityCount,provCount,num, name.strip('\n'),listToUtf8(lazy_pinyin(unicode(name.strip('\n'),"utf-8"))),listToUtf8(pinyinFirst(unicode(name.strip('\n'),"utf-8")))])
    else:
        break

    #print line.decode('string_escape')
    result.append(line)

#print result.decode('string_escape') #增加decode这样就能正常的显示中文了而不是编码值了
f.close()
