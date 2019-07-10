'use strict';
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

function isPromotion(barcode){
    const promotions=loadPromotions()[0].barcodes;
    let flag=0;
    promotions.forEach((promotionBarcode)=>{
        if(barcode.split('-')[0]===promotionBarcode){flag=1;}
    })
    if(flag==0) return false;
    else return true;
}

function getItem(itemBarcode){
    const allItems=loadAllItems();
    let item;
    allItems.forEach((oneItem)=>{
        if(oneItem.barcode===itemBarcode){
            item=oneItem;
        }
    });
    return item;
}
function printReceipt(tags){
    const itemCount=getItemCount(tags);
    let oldSum=0;
    let newSum=0;
    let result="***<没钱赚商店>收据***\n"
    for(let i in itemCount){
        if(itemCount[i]>=3){
            if(isPromotion(i)){
                let item=getItem(i);
                oldSum+=itemCount[i]*item.price;
                newSum+=(itemCount[i]-Math.floor(itemCount[i]/3))*item.price;
                result+=`名称：${item.name}，数量：${itemCount[i]}${item.unit}，单价：${(item.price).toFixed(2)}(元)，小计：${((itemCount[i]-Math.floor(itemCount[i]/3))*item.price).toFixed(2)}(元)\n`;
            }
            else{
                let item=getItem(i);
                oldSum+=itemCount[i]*item.price;
                newSum+=itemCount[i]*item.price;
                result+=`名称：${item.name}，数量：${itemCount[i]}${item.unit}，单价：${(item.price).toFixed(2)}(元)，小计：${((itemCount[i]-Math.floor(itemCount[i]/3))*item.price).toFixed(2)}(元)\n`;
            }
        }
        else{
                let item=getItem(i);
                oldSum+=itemCount[i]*item.price;
                newSum+=itemCount[i]*item.price;
                result+=`名称：${item.name}，数量：${itemCount[i]}${item.unit}，单价：${(item.price).toFixed(2)}(元)，小计：${((itemCount[i]-Math.floor(itemCount[i]/3))*item.price).toFixed(2)}(元)\n`;
        }
    }
    result+=`----------------------\n总计：${newSum.toFixed(2)}(元)\n节省：${(oldSum-newSum).toFixed(2)}(元)\n**********************`
    console.log(result);
}