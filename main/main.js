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

function getItemCount(tags){
    const itemCount=[];
    tags.filter((tag)=>{
        if(tag.indexOf("-")!==-1){
            let barcode=tag.split("-")[0];
            let number=parseFloat(tag.split("-")[1]);
            if (itemCount[barcode]===undefined)
                itemCount[barcode]=number;
            else itemCount[barcode]+=number;

        }
        else{
            let barcode=tag;
            if (itemCount[barcode]==undefined)
                itemCount[barcode]=1;
            else itemCount[barcode]+=1;
        }
    });
    return itemCount;
}
function printReceipt(tags){
    const itemList=getItemCount(tags);
    const promotions=loadPromotions()[0]['barcodes'];
    
    console.log(itemList);

}