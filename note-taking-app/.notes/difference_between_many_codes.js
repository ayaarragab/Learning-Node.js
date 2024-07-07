#!/usr/bin/env node
// asyncronus timing function

// What is the difference between this code (a)

const func = (time, f) => {
    setTimeout(() => {
        f;
    }, time)
}

func(1000, console.log(" Iam func (a)"))

// This code (b)

const func2 = (time, f) => {
    setTimeout(() => {
        f;
    }, time)
}

func2(2000, () => {
    console.log(" Iam func (b)")
})

// this codeV (c)

const func3 = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

func3(3000, () => {
    console.log(" Iam func (c)")
})

// this func (d)
const func4 = (time, f) => {
    setTimeout(() => {
        f();
    }, time)
}

func4(4000, console.log(" Iam func (d)"))



// What will happen in this program?
