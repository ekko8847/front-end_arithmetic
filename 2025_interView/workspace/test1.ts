class Person1 {
  public age:number = 18
  #name:string = 'paul'
  constructor(name: string,age: number) {
    this.name = name;
    this.age = age;
    this.twoNum()//只能自己访问
  }
  get name() { 
    return this.name;
  }
  set name(name: string) {
    this.name = name;
    this.#name = name;
  }
  private twoNum(nums?:number[],target:number=9):number[] {
    const map = new Map();
    let i = 0;
    while (i < nums.length) {
      const current = nums[i];
      const diff = target - current;
      if(map.has(diff)){
        return [map.get(diff),i]
      }
      map.set(current,i);
      i++;
    }
  }
  protected groupByCharts(strs?: string[]):string[][] {
    const map =new Map();
    for(let i = 0;i<strs.length;i++){
      const key= strs[i].split('').sort().join('');//以assII码排序后的字符串为key
      if(!map.has(key)){
        map.set(key,[]);
      }
      map.get(key).push(strs[i]);
    }
    return Array.from(map.values());
  }
  threeNums(nums?:number[]):number[][] {
    nums.sort((a,b)=>a-b);
    let target =10;
    let res:number [][] = [];
    for(let i=0; i<nums.length-2; i++){
      if(i>0&&nums[i]===nums[i-1]) continue; //去重
      let j = i+1,k=nums.length-1;
      while(j<k){
        const sum=nums[i]+nums[j]+nums[k];
        if(sum===0){
          res.push([nums[i],nums[j],nums[k]]);
          while(nums[j]===nums[j+1]) j++; //去重 重复数字指针直接移动两次
          while(nums[k]===nums[k-1]) k--;
          j++;
          k--;
        }else if(sum<target){
          j++;
        }else{
          k--;
        }
      }
    }
    return res;
  }
}
interface Person {
  name: string;
  age: number;
  say(message: string): void;
}
class Person2 extends Person1 implements Person{
  constructor(name,age){
    super(name,age);
    this.groupByCharts();//可以访问
    this.twoNum();//报错
  }
  say(message: string) {
    console.log(message);
  }
}
const p = new Person2('ekko',26); 
p.say('hello world'); // hello world
p.groupByCharts(); // 报错 s
p.threeNums(); //可以访问
