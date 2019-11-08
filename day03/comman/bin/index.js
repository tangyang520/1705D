#!/usr/bin/env node

// const program = require('commander');

// program
//     .version('1.0.0')
//     .option('-a,--add','add something')
//     .option('-u,--update','update something')
//     .option('-r,--remove','remove somthing')
//     .parse(process.argv)
    
// console.log('You choose:');

// if(program.add){
//     console.log(' add somthing')
// }

// if(program.update) {
//     console.log(' update something')
// }

// if(program.remove){
//     console.log(' remove something')
// }

const inquirer = require('inquirer');

const promptList = [{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
},{
    type: 'input',
    message: '请输入手机号:',
    name: 'phone',
    validate: function(val) {
        if(val.match(/\d{11}/g)) { // 校验位数
            return true;
        }
        return "请输入11位数字";
    }
}];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})

