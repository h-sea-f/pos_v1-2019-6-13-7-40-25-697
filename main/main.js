'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
function isContainItem(tags){
    const allItems=loadAllItems();
    let isContain=1;
    tags.forEach(tag => {
        let flag=0;
        allItems.forEach(item=>{
            if(tag.split("-")[0]===item.barcode) flag=1;
        });
        if(flag===0) isContain=0;
    });
    if(isContain===1) return true;
    else return false;
}

function getItemList(tags){
    const allItems=loadAllItems();
    const itemList={};
    tags.forEach(tag=>{
        allItems.forEach(item=>{
            if(tag.split("-")[0]===item.barcode){
                if(tag.split("-")[1]!==null){
                    itemList[item]=itemList[item]>=1?itemList[item]+tag.split("-")[1]:tag.split("-")[1];
                }
                else itemList[item]=itemList[item]>=1?itemList[item]+1:1;
            }
        });
    });
    return itemList;
}
function printReceipt(tags){
    const itemList=getItemList(tags);
    const promotions=loadPromotions()[0]['barcodes'];
    for(let i in itemList){
        for(let j in promotions){
            if(i.barcode){}
        }
    }

}