import axios from 'axios';

class FileService {
  addFile(fid, pid) {
    let url = `${QUEUE_URL}`;
    return axios.post(url, {
    	fid: fid,
    	pid: pid
    }).then((res) => {
      console.log("res", res);
    });
  }
}

export default new FileService();
