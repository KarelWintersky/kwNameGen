JS Console:

```
var listarray = lastname; // подставить сюда нужный массив имён

var let = '';
listarray.sort();
listarray = listarray.filter(function(item, pos, self) { return self.indexOf(item) == pos; });
listarray.forEach(function(element, index,array){ let += '"' + element + '",\n'; } );
console.log(let);

```

