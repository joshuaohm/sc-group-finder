/*
 *  Used as a mixin globally to create a unique id for every component, and assign its html element a name/id if not given one already.
 *
 */
var hex = [];

for (var i = 0; i < 256; i++) {
  hex[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

function makeUUID() {
  var r = crypto.getRandomValues(new Uint8Array(16));

  r[6] = r[6] & 0x0f | 0x40;
  r[8] = r[8] & 0x3f | 0x80;

  return (
    hex[r[0]] +
    hex[r[1]] +
    hex[r[2]] +
    hex[r[3]] +
    "-" +
    hex[r[4]] +
    hex[r[5]] +
    "-" +
    hex[r[6]] +
    hex[r[7]] +
    "-" +
    hex[r[8]] +
    hex[r[9]] +
    "-" +
    hex[r[10]] +
    hex[r[11]] +
    hex[r[12]] +
    hex[r[13]] +
    hex[r[14]] +
    hex[r[15]]
  );
}

var set = function () {

  if (Object.isExtensible(this.$attrs)) {

    if (!this.$attrs.id)
      this.$attrs.id = this.$uuid;
    else if (this.$props && this.$props.content && this.$props.content.id)
      this.$attrs.id = this.content.id;
  }

  if (this.$props && this.$props.content && !this.$props.content.id)
    this.content.id = this.$uuid;

  if (this.$props && this.$props.content && this.$props.content.name)
    this.$attrs.name = this.content.name;

}

var generate = function () {

  this.$uuid = makeUUID();

  if (Object.isExtensible(this.$attrs)) {
    if (!this.$attrs.id)
      this.$attrs.id = this.$uuid;
    else if (this.$props && this.$props.content && this.$props.content.id)
      this.$attrs.id = this.content.id;
  }

  if (this.$props && this.$props.content && !this.$props.content.id)
    this.content.id = this.$uuid;

  if (this.$props && this.$props.content && this.$props.content.name)
    this.$attrs.name = this.content.name;

}

export default {
  beforeCreate: generate,
  mounted: set
};
