로컬에서 서버 띄우는 방법

1. Local DB 준비 (쉘 기준 작성)

```sh
mysql.server start

mysql -u root -p

mysql localhost 비밀번호 입력 (코드 상에는 1로 되어 있음)
```

```sh
mysql 
CREATE DATABASE store_management_dev;
```

2. DB config 수정
`lambdas/database.js line 81 new Sequelize(this._getDBName(), 'root', '1', {}) => '1'을 자신의 mysql localhost 비밀번호로 바꾼다`

3. 서버 시작
`npm run serve:dev`

4. 서버 종료
`npm run serve:stop`

5. 테스트 시
`서버 시작(3번) 후, npm test`  
**테스트 시 DB에 있는 정보에 영향을 받음 (때에 따라 fail & DB 데이터 모두 날아감: 순전히 개발용, 추후에 도커로 개발용 DB, 테스트용 DB 분리 예정)**
