#### 2022-06-01

##### Chores

*  🤖 sonarCloud fix (1fd9c939)
*  fix sonarcloud (69f4c22f)
*  fix sonarcloud (834befe9)
*  init project (7379bbb0)
*  fix sonarcloud (e59bc718)
*  fix sonarcloud (4bd2b3e9)
*  fix sonarcloud (9e502999)
*  fix sonarcloud (0fc9d4b3)
*  fix sonarcloud (55fc0f34)
*  fix sonarcloud (f5a872ec)
*  fix sonaclourd (82efa818)
*  fix sonarcloud (16a718b9)
*  fix sonarcloud (346a92b2)
*  add sonarcloud (f308e4f9)
*  init project (40528571)

##### Continuous Integration

*  🎡 add vercel conf (a08233a6)
*  🎡 Rerun sonarcloud (c35859e3)

##### New Features

*  🎸 update user (24a6018f)
*  🎸 add stat with fake data for animeList and watchedAnime (a4ab1018)
*  🎸 comment like/dislike (808603b5)
*  🎸 nodemailer package (98786f5b)
*  🎸 create mailer file with send mail method (d659916c)
*  🎸 reset password routes (4dfe1b32)
*  🎸 random string generator (ab47d108)
*  🎸 create cache object (275852bb)
*  🎸 create reset password controllers (8b224748)
*  🎸 generateResetPasswordKey service method (ada9386a)
*  🎸 create reset password validations (df3f70db)
*  🎸 Update password route (79b55458)
*  🎸 Update password of user service (17ea2ba9)
*  🎸 update password controller (8008d82d)
*  update password validation (5870d059)
*  🎸 ban, unban user and remove comment controller (df31588b)
*  🎸 ban, unban user and remove comment (af9959a4)
*  🎸 change remove function to work with isAdmin (c47b69ee)
*  🎸 ban and unban function (b540dbda)
*  🎸 all routes (e8120e95)
*  🎸 create, update, remove, getAllCommentsByAnime (66d142fc)
*  🎸 create, update, remove, getAllCommentsByAnime (f226f8f5)
*  🎸 add bad-words lib with french bad words (b7567ba7)
*  🎸 comment validation (8baacf0f)
*  🎸 comment model (fdba15db)
*  🎸 Add isAdmin and isBanned user middleware (da47dcde)
*  🎸 Add roles and banned in user model (8d639ecd)
*  🎸 Add getUser in the service (50fb09eb)
* **list:**
  *  add get animes of list (bc49a8b4)
  *  add specific action to list update (e9c7aa49)
  *  add default lists (9444f4d6)
  *  add list deletion (ea628c03)
  *  add list update (0330b810)
  *  create list (b58288b0)
* **anime:**
  *  add 2 new filters on anime search (ef1cc934)
  *  get episodes of specific season (76fcfddf)
  *  add getMutliple anime (f7872b98)

##### Bug Fixes

*  fix typo and eslint config (5c0e527c)
*  🐛 code smell return await (12a478a7)
*  🐛 joi require failed on vercel (175623f8)
*  🐛 server send now email correctly (16ede495)
*  🐛 findOne change to findOneById (439b91bb)
*  Joy not found (6e42357d)
*  🐛 isBanned middleware (8d902f90)
*  🐛 getUser by his email (9c5d37ff)
* **anime:**
  *  fix anime get params (68a86162)
  *  add missing plural to routes (b96e17b8)
  *  fix code according to last review (6ca201a0)
  *  fix linter issues (b8d2a1fd)
* **lists:**
  *  use two separates routes for add and remove (f00f6bfe)
  *  add missing infos in animes and fix remove action (52919299)
  *  remove useless await on return (0065a837)
  *  fix joi imports (62dafbb3)
* **list:**  remove useless await and add missing action (42ff9683)

##### Other Changes

* //github.com/antobrines/Subarashii-BackEnd-Audit-v2 into refactor/lists (f405d5bc)
* antobrines/Subarashii-BackEnd-Audit-v2 into refactor/user (5bbe3b50)
*  gitignore (6d055994)
*  init project (1fe6bd3a)

##### Refactors

*  💡 rename update to updateValidate in userValidate (fe3e8e98)
*  💡 remove console.log (44994e7a)
*  💡 pass to unix (dd54146d)
*  💡 remove \r from all files (20e970a0)
*  💡 fix security generate random string (27484d63)
*  💡 return success send mail on mailer utils (34719ece)
*  💡 let to const (96a508ab)
*  💡 add manage error user service mailing (83ac70d4)
*  💡 delete user reset password key after change (ac191af4)
*  💡 eslint + deleteSpecificCacheValue (5340bb42)
*  💡 remove await from findOneById method (b9d5841f)
*  💡 Joy -> joy (888381f9)
*  💡 me user service return directly without roles & pwd (b906ba25)
*  💡 remove console log + replace let -> const (4e170e8c)
*  💡 memoryCache use arrow function and export (41a3ad1d)
*  💡 change route url /me (088c48ac)
*  💡 update test-connexion to me route (38be2e0f)
*  💡 delete dead code (92d5c7e4)
*  💡 manage error reset password (05ebf6b5)
*  💡 Error management generateResetPasswordKey (712ee013)
*  💡 delete console log from memorycache.js (833cf00e)
*  💡 remove const to return directly the value (79d5cb5e)
*  💡 add await to function (e350fdd6)
*  💡 change return remove function (1967f117)
*  💡 typo users route (15a4c022)
*  💡 Change typo function name (a20c8b18)
*  fix validator user (05d82909)
* **anime:**  service setup (f671fde5)

##### Code Style Changes

*  fix unused param (cb134f78)
*  fix httpStatus (2f2f4d40)
*  fix breakdown (23c067c4)
*  fix breakdown (39f9f711)
*  fix httpStatus (ea1f16e9)

