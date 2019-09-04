import { JavaApiProvider } from '../providers/java-api/java-api';

export class NetController {
	public data : any;
	public selected : any;
	public dateRange : string;
	public api : JavaApiProvider;

	public filterString : string;

	inFilter(str : string){
		return !this.filterString || str.toLowerCase().includes(this.filterString.toLowerCase());
	}

	inDateRange(item, range){

		if(range == "All"){
			return true;
		}

		
		let now = (new Date()).getTime();

		let least = now - this.getLeastTimeAllowed(range);

		let itemDate = (new Date(item.createdAt)).getTime();
		return itemDate > least;
	}

	getLeastTimeAllowed(opt:string){
		let time = 0;
		switch (opt) {
			case "24":
				// code...
				time = 84600 * 1000;
				break;
			case "1":
				time = this.getLeastTimeAllowed("24") * 7;
				break;
			default:
				// code...
				time = this.getLeastTimeAllowed("1") * 4;
				break;
		}
		return time;
	}


  generateResourceFilter(k : string, m : string){
      return (obj : any) => {

        if(obj[k] == m || k == ""){
          return true;
        }
        return false;
      }
  }

  fetchResourceList( 
  varName : string,
  resource : string,
  key : string,
  filter : (obj : any) => any ){
      this.api.http.get(`${this.api.URL}${resource}`, this.api.httpOptions)
      .subscribe((res: any) => {      

          let list = [];
          for (var i = res.data.length - 1; i >= 0; i--) {
            let item = res.data[i];
            let displayedVal = item[key];
            if(filter(item) && displayedVal && displayedVal != ""){
              list.push(displayedVal);
            }
          }

          this[varName] = list;
      });
      return [];
  }
}