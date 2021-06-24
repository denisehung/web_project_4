export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = nameSelector;
        this._jobElement = jobSelector;
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
}