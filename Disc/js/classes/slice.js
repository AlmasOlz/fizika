// slice.js
class Slice {
  constructor(x, y, radius, startAngle, endAngle, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.color = color
  }
  draw(ctx, rotateAngle = 0) {
    // ctx is the canvas context

    ctx.moveTo(this.x, this.y)
    ctx.beginPath()
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle + rotateAngle,
      this.endAngle + rotateAngle
    )
    ctx.lineTo(this.x, this.y)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}
