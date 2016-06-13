# python port of TimeConverter.js
# Inclomplete, OBVS

def convToCCT(ms,tmprlRA):
    rawMiao = ms // 144
    miao = rawMiao % 100
    fen = 0
    xiaoKe = 0
    ke = 0
    shiChenNum = 0
    day = 0
    localRA = [];

    #Can all this be part of the var's definitions?
    if rawMiao >= 100:
	fen = (rawMiao // 100) % 60
    elif rawMiao >= 1000:
	xiaoKe = (rawMiao // 1000) % 50
    elif rawMiao >= 6000:
	ke = (rawMiao // 6000) % 100;
    elif rawMiao >= 50000:
	shiChenNum = (rawMiao // 50000) % 100
    elif rawMiao >= 600000:
	day = (rawMiao // 600000)

    #are both of these steps necessary?
    localRA.append(day)
    localRA.append(shiChenNum)
    localRA.append(ke)
    localRA.append(xiaoKe)
    localRA.append(fen)
    localRA.append(miao)

    tmprlRA = localRA;

def displayCCT (ms,tmprlRA):
    convToCCT(ms,tmprlRA)

    #Thows error: List Index out of range.
	#At the risk of sounding ignorant, 
	#why can't you just access it in python?
    #Option 1: Convert tmprlRA to a Dictionary. I know that works.
    #Option 2: find the sintax that allows list access.
    num = tmprlRA[1]
    shiChen = ''

    if num == 0: shiChen = 'Zi'
    elif num == 1: shiChen = 'Chou'
    elif num == 2: shiChen = 'Yin'
    elif num == 3: shiChen = 'Mao'
    elif num == 4: shiChen = 'Chen'
    elif num == 5: shiChen = 'Si'
    elif num == 6: shiChen = 'Wu'
    elif num == 7: shiChen = 'Wei'
    elif num == 8: shiChen = 'Shen'
    elif num == 9: shiChen = 'You'
    elif num == 10: ShiChen = 'Xu'
    else: #if num == 11:
	shiChen = 'Hai'

    for i in tmprlRA:
	if tmprlRA[i] < 10:
	    str(tmprlRA[i])
	    tmprlRA[i] = '0' + tmprlRA[i]

    display = 'day %s. %s Shi %s. Ke %s:%s:%s o\'day.' % (tmprlRA[1],tmprlRA[2],tmprlRA[3],tmprlRA[4],tmprlRA[5])

    return display

def main():
    tmprlRA = []
    print displayCCT(1465677620491,tmprlRA)
    #Close to: Day 16963. Wu Shi 41. Ke 56:53:05 o'day.
if __name__ == '__main__':
    main()
