psql
psql -U postgres -- psql -U <username>
createdb -U postgres test -- createdb -U <username> <dbname>
psql -U postgres test -- psql -U <username> <dbname>
psql -U postgres -h 127.0.0.1 -p 5432 test -- psql -h <host ip> -U <username> -d <target db>

set PGUSER=postgres -- set PGUSER
dropdb test

\l -- List of Entire database instance
\d -- \d <table name> Detail info of table
\dt -- Table List of Connected database instance -- \dt+ detail
\ds -- List of sequence
\df -- List of function
\dv -- List of view
\du -- List of user

\g -- 방금 전에 실행했던 명령어
\s -- 이전에 실행했던 명령어 전체 리스트 조회
\h -- sql command에 대한 도움말
\? -- psql command에 대한 도움말

\x -- Column들을 한줄로 조회하기 힘들 때, Column을 세로로 배치해서 Display하는 기능 on/off.
\a -- Column Align on/off. Default는 Align On 상태.
\H -- HTML의 <table> tag를 활용해서 출력. on/off
\timing -- Query 실행 시간 표시. on/off
\i -- \i <file name> 외부 파일을 통한 Query 실행.

\e -- \i가 이미 만들어진 File 안에 있는 Query를 수행하는데 비해, \e는 외부 편집기를 통해 Query를 작성해서 실행할 때 사용. Linux에서는 vi가, Window에서는 메모장이 Default Editor로 실행.
\ef -- \e와 유사하나 FUNCTION 편집할 때 사용한다는 측면에서 상이.
\ev -- \e와 유사하나 VIEW 편집할 때 사용한다는 측면에서 상이.

-- \e <file name>
-- \ef <function name>
-- \ev <view name>

\! -- psql에서 shell command 실행할 때 사용. -- /! <shell command>
\! clear -- 화면 Clear
\! cls
\! pwd -- 현재 경로 확인
\! cd
\! ls -- 현재 경로 파일 확인
\! dir
\! cd -- \!cd <path> path 경로로 이동.

\q -- exit

\i a.sql
