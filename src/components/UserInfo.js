export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatar }) {
        this._nameElement = nameSelector;
        this._jobElement = jobSelector;
        this._avatar = avatar;
      }
    

    getUserInfo() {
        return {
            userName: this._nameElement.textContent,
            userJob: this._jobElement.textContent
        }
    }

    setUserInfo(data) {
        const{ username, userjob } = data;
        this._nameElement.textContent = username;
        this._jobElement.textContent = userjob;
    }

    changeAvatar(data) {
        const{ link } = data;
        this._avatar.src = link;
    }

}