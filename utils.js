export const activeTasks = new WeakMap();

export function sleep(ms) {
    let timeoutId, resolvePromise;
    const promise = new Promise((resolve) => {
        resolvePromise = resolve;
        timeoutId = setTimeout(resolve, ms);
    });
    return {
        promise,
        cancel: () => {
            clearTimeout(timeoutId);
            resolvePromise();
        }
    };
}

export async function typeText(
    element,
    text,
    append = true,
    wait = false,
    typingDelay = 50,
    initialDelay = 0
) {
    if (wait) {
        while (activeTasks.has(element)) {
            const previousTask = activeTasks.get(element);
            await previousTask.donePromise;
        }
    } else if (activeTasks.has(element)) {
        cancelTyping(element, append);
    }

    let resolveDone;
    const donePromise = new Promise((res) => (resolveDone = res));
    const initialText = append ? element.textContent : "";

    let isCancelled = false;
    let currentSleep = null;

    const task = {
        targetText: text,
        donePromise,
        cancel: (completeText = true) => {
            isCancelled = true;
            if (completeText) {
                element.textContent = initialText + text;
            }
            if (currentSleep) {
                currentSleep.cancel();
            }
            resolveDone();
        }
    };
    activeTasks.set(element, task);
    try {
        if (initialDelay > 0) {
            currentSleep = sleep(initialDelay);
            await currentSleep.promise;
            if (isCancelled) return;
        }

        if (!append) {
            element.textContent = "";
        }

        for (let char of text) {
            if (isCancelled) return;
            element.textContent += char;

            currentSleep = sleep(typingDelay);
            await currentSleep.promise;
        }
    } finally {
        resolveDone();
        if (activeTasks.get(element) === task) {
            activeTasks.delete(element);
        }
    }
}

export function cancelTyping(element, completeText = true) {
    const task = activeTasks.get(element);
    if (task) {
        task.cancel(completeText);
        activeTasks.delete(element);
    }
}

export function randInt(l, r){
    let range = r+1-l;
    return l + Math.floor(Math.random()*range);
}

export let activeChoiceResolver = null;
export function waitForUserChoice(){
    return new Promise((resolve) => {activeChoiceResolver = resolve;});
}