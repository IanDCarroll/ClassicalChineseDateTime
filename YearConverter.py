#Python port from JS

def idStemBranch(sixtyNum):

    stemNum = sixtyNum % 10
    branchNum = sixtyNum % 12
    stem = ''
    branch = ''

    if stemNum == 1:
	stem = 'Jia'
    elif stemNum == 2:
	stem = 'Yi'
    elif stemNum == 3:
	stem = 'Bing'
    elif stemNum == 4:
	stem = 'Ding'
    elif stemNum == 5:
	stem = 'Wu'
    elif stemNum == 6:
	stem = 'Ji'
    elif stemNum == 7:
	stem = 'Geng'
    elif stemNum == 8:
	stem = 'Xin'
    elif stemNum == 9:
	stem = 'Ren'
    else: #if stemNum == 0: #10
	stem = 'Gui'


    if branchNum == 1:
	branch = 'Zi'
    elif branchNum == 2:
	branch = 'Chou'
    elif branchNum == 3:
	branch = 'Yin'
    elif branchNum == 4:
	branch = 'Mao'
    elif branchNum == 5:
	branch = 'Chen'
    elif branchNum == 6:
	branch = 'Si'
    elif branchNum == 7:
	branch = 'Wu'
    elif branchNum == 8:
	branch = 'Wei'
    elif branchNum == 9:
	branch = 'Shen'
    elif branchNum == 10:
	branch = 'You'
    elif branchNum == 11:
	branch = 'Xu'
    else: #if branchNum == 0: #12
	branch = 'Hai'

    return '%s%s' % (stem,branch)

def numPure(rawNum):

    if rawNum == 0:
	return 60
    elif rawNum == -1:
	return 59
    elif rawNum == -2:
	return 58
    elif rawNum == -3:
	return 60
    else:
	return rawNum

def yearConverter(year,era):

    number = 0

    if era == 'AD':
	number = numPure((year - 3) % 60)
    elif era == 'BC':
	number = numPure(60 - ((year + 2) % 60))

    return idStemBranch(number)



def main():
    print yearConverter(2016,'AD')
    #print yearConverter(1983,'AD')
    #print yearConverter(221,'BC')
    #print yearConverter(5,'BC')
    #print yearConverter(4,'BC')
    #print yearConverter(3,'BC')
    #print yearConverter(2,'BC')
    #print yearConverter(1,'BC')
    #print yearConverter(1,'AD')
    #print yearConverter(2,'AD')
    #print yearConverter(3,'AD')
    #print yearConverter(4,'AD')
    #print yearConverter(5,'AD')


if __name__ == '__main__':
    main()
