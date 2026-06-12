import mysql.connector
import time
x=mysql.connector.connect(user='root',host='localhost',passwd='20042004p',database='quiz')
y=x.cursor()
print('WELCOME TO QUIZ MAKER')
tr='true'
while tr=='true':
 print('>> Enter 1 for creating quiz')
 print('>> Enter 2 for participating in the quiz')
 rt=3
 while rt==3:
  L=input('>> Enter your choice(1/2):')
  if L.isnumeric():
      e=int(L)
      rt=4
  else:
      print('Please enter the numbers only(1 or 2)')
      rt=3
 print('---------------------------------------------------')
 if e==1:
    name=input('Enter your quiz name:')
    ne=name.title()
    lp=2
    while lp==2:
      n=int(input('Enter the number of questions:'))
      if n<=0:
          print(':Please enter the number of questions greater than 0')
          lp=2
      else:
          lp=3
    s1='create table {}(no int,question varchar(500),option_A varchar(50),option_B varchar(50),option_C varchar(50),option_D varchar(50),answer varchar(10))'.format(ne)
    y.execute(s1)
    for i in range(1,n+1):
          q='v'
          print('-----------------------------------------------------')
          while q=='v':
           print('Q',i,".",end='')
           question=input('Enter your question:')
           if len(question)==0:
               q='v'
               print('Please enter the question again')
           else:
               q='s'
          a=input('Enter the option A:')
          b=input('Enter the option B:')
          c=input('Enter the option C:')
          d=input('Enter the option D:')
          list=['A','B','C','D']
          ans=input('>>Enter your correct option(A/B/C/D):')
          if ans.upper() in list:
               r=ans.upper()
               y.execute('insert into {} values({},"{}","{}","{}","{}","{}","{}")'.format(ne,i,question,a,b,c,d,r))
          else:
              yt='x'
              while yt=='x':
                print('Please select the option correctly')
                ans=input('Enter the correct option(A/B/C/D):')
                r=ans.upper()
                if r in list:
                  y.execute('insert into {} values({},"{}","{}","{}","{}","{}","{}")'.format(ne,i,question,a,b,c,d,r))
                  yt='y'
                else:
                    yt='x'
    x.commit()
    print('Quiz added successfully')
 elif e==2:
    na=input('Enter your name:')
    print('Instructions:-')
    print('> Each question carry one mark')
    print('> For selecting answer enter the options(A/B/C/D)')
    print('> There is only 1 minute for attending a question')
    y.execute('show tables')
    details=y.fetchall()
    details.remove(('participants',))
    print('Available quizes:')
    l=len(details)
    print('+---------+-----------')
    print('|Quiz num','|''Quiz name')
    print('+---------+-----------')
    for i in range(l):
        print('|',i+1,".","    |",details[i][0].title())
    dict={}
    for i in range(1,l+1):
        dict[i]=details[i-1][0]
    num=int(input('Enter the Quiz num to participate in the respective quiz:'))
    if num in dict.keys():
        qn=dict[num]
        print('Quiz has started')
        print('----------------------------------------------')
        print('Quiz Name:',qn.title())
        y.execute('select * from {}'.format(qn))
        t=y.fetchall()
        score=0
        uo=len(t)
        yu=[]
        for k in t:
            l=len(k)
            ert='we'
            w=k[:l-1:]
            print('Q',w[0],'.',w[1].capitalize())
            print('    :option A:',w[2])
            print('    :option B:',w[3])
            print('    :option C:',w[4])
            print('    :option D:',w[5])
            list1=['A','B','C','D']
            while ert=='we':
             answer=input('    Enter your answer(A/B/C/D):')
             if answer.upper() in list1:
                 ert='wee'
             else:
                 ert='we'
                 print('Please enter the option correctly')
             print('===================================================================================================')
             if answer.upper()==k[l-1]:
                score=score+1
             else:
                yu.append([w[0],k[l-1]])
                score=score
        print('Your score is : ',score,'out of',uo)
        if score==uo:
            print('Excellent')
        else:
            print('You made mistakes in questions:')
            for i in yu:
               print('Q',i[0],',Correct option=',i[1])
        y.execute('insert into participants values("{}","{}",{})'.format(na,qn,score))
        x.commit()
    else:
        print('Quiz num is not present')
 else:
     print('Enter the correct choice')
 print('If you want to continue into the quiz enter Y else enter N')
 op=input('Enter your choice(Y/N):')
 if op.upper()=='Y':
     tr='true'
 else:
     tr='false'
     print('Finished')
y.close()
x.close()

            
            


          
          
