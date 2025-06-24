<template>
    <div></div>
</template>

<script>
function fn(arr){
    let result = []
    for (let i = 0; i < arr[0].length; i++) {
        result.push(arr.map(item => item[i]));
    }
    return result;
}
console.log(fn([
    [1,4,6,10],
    [5,9,12,15],
    [7,11,16,23],
]))

</script>
