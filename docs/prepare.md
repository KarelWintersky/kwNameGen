JS Console:

Это для многосоставных имён

```

var input = lastname;
var output = '';

input.sort();
input = input.filter(function(item, pos, self) { return self.indexOf(item) == pos; });
input.forEach(function(element, index,array) {
    let el = element.replace(/(\S+)(\s+){2,}(\S+)/, function(match, part1, part2, part3, offset, string) { return part1 + " | " + part3; });
    output += '"' + el + '",\n';
} );
console.log(output);


```
