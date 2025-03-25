<template>
    <div class="story">
        <div class="title">One-Way Data Flow</div>
        <div class="content">
            All props form a one-way-down binding between the child property and the parent one: when the parent
            property updates,<span class="hightlight">it will flow down to the child, but not the other way
                around.</span> This prevents child
            components from accidentally mutating the parent's state, which can make your app's data flow harder to
            understand.

            In addition, every time the parent component is updated, all props in the child component will be refreshed
            with the latest value. This means you should not attempt to mutate a prop inside a child component.
        </div>
        <div class="title">Mutating Object / Array Props</div>
        <div class="content">When objects and arrays are passed as props, while the child component cannot mutate the
            prop binding, it will be able to mutate the object or array's nested properties. This is because in
            JavaScript objects and arrays are passed by reference, and it is unreasonably expensive for Vue to prevent
            such mutations.

            The main drawback of such mutations is that it allows the child component to affect parent state in a way
            that isn't obvious to the parent component, potentially making it more difficult to reason about the data
            flow in the future.<span class="hightlight2">As a best practice, you should avoid such mutations unless the parent and child are
            tightly coupled by design.</span> In most cases, the child should emit an event to let the parent perform the
            mutation.</div>
    </div>
</template>

<style lang="scss" scoped>
.story {
    max-width: 800px;
    margin: 0 auto;
    letter-spacing: 1px;
    line-height: 36px;
    .title {
        margin-top: 20px;
        font-size: 48px;
        font-weight: bold;
    }
    .content {
        margin-top: 10px;
        font-size: 24px;
    }
    .hightlight {
        padding: 4px 10px;
        background-color: rgba(27,27,238,.4);
        border: 1px solid #000000;
        border-radius: 6px;
    }
    .hightlight2 {
        padding: 4px 10px;
        background-color: rgba(27,27,238,.4);
        border: 1px solid #000000;
        border-radius: 6px;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
    }
}
</style>