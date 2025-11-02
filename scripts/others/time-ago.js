const formatNoteCount = (() => {
    const formatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
    });
    
    return (num) => formatter.format(num);
});

const initNoteCountFormatting = (options = {}) => {
    const {
        containerSelector = '.theme-container',
        itemSelector = '.notecount',
        threshold = 999,
        locale = 'en-US'
    } = options;
    
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const noteCounts = container.querySelectorAll(itemSelector);
    
    for (let i = 0; i < noteCounts.length; i++) {
        const element = noteCounts[i];
        const number = parseInt(element.textContent.replace(/[,\s]/g, ''), 10);
        
        if (number > threshold) {
            element.textContent = formatNoteCount(number);
        }
    }
};
