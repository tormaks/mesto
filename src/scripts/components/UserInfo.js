export default class UserInfo {
   constructor({nameSelector, jobSelector, avatarSelector}) {
      this._nameSelector = document.querySelector(nameSelector);
      this._jobSelector = document.querySelector(jobSelector);
      this._avatarSelector = document.querySelector(avatarSelector);
   }

   getUserInfo() {
      this._userName = this._nameSelector.textContent;
      this._userJob = this._jobSelector.textContent;
      return {
         name: this._userName,
         job: this._userJob,
      }
   }

   setUserInfo(newName, newJob) {
      this._nameSelector.textContent = newName;
      this._jobSelector.textContent = newJob;
   }

   setUserAvatar(newAvatar) {
      this._avatarSelector.src = newAvatar;
   }
}