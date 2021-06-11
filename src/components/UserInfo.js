export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = nameSelector;
        this._jobElement = jobSelector;
      }
    

    getUserInfo() {
        return {
            title: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
    }

    setUserInfo(data) {
        const{ name, job } = data;
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}