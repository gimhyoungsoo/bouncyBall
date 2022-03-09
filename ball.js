export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius
        this.vx = speed
        this.vy = speed

        const diameter = this.radius * 2
        this.x = this.radius + (Math.random() * (stageWidth - diameter));
        this.y = this.radius + (Math.random() * (stageHeight - diameter));
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx
        this.y += this.vy

        this.bounceWindow(stageWidth, stageHeight)

        ctx.fillStyle = 'yellow'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()

        this.bounceBlock(block)
    }

    bounceWindow(stageWidth, stageHeight) { // 너비와 높이를 가져와서 공이 닿았는지 판별
        const minX = this.radius
        const maxX = stageWidth - this.radius
        const minY = this.radius
        const maxY = stageHeight - this.radius

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1
            this.x += this.vx
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1
            this.y += this.vy
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius
        const maxX = block.maxX + this.radius
        const minY = block.y - this.radius
        const maxY = block.maxY + this.radius

        if (this.x >= minX && this.x <= maxX && this.y >= minY && this.y <= maxY) {
            const x1 = Math.abs(this.x - maxX)
            const x2 = Math.abs(minX - this.x)
            const y1 = Math.abs(this.y - maxY)
            const y2 = Math.abs(minY - this.y)
            const minGapX = Math.min(x1, x2)
            const minGapY = Math.min(y1, y2)
            const minGap = Math.min(minGapX, minGapY)
            if (minGap == minGapX) {
                this.vx *= -1
                this.x += this.vx
            } else if (minGap == minGapY) {
                this.vy *= -1
                this.y += this.vy
            }
        }
    }
}