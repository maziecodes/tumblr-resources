// remove empty p tags
for (const p of document.querySelectorAll('p')) {
    if (p.innerHTML.trim() === '') {
       p.remove()
    }
}
// create posts array
let posts = []
{block:Posts} 
    posts.push({ npf: JSON.parse({JSNPF}), id: {JSPostId}}) 
{/block:Posts}

//function for updating post types 
function updateTypes(type, article) {
    article.classList.remove('text-post')
    article.classList.add(`${ type }-post`, 'npf-post')
}

// loop through array to get each post
for (const post of posts) {
   let npf = post.npf
   let article = document.getElementById(`post-${post.id}`)
   // select captions that have something in them
   let caption = article.querySelector('.caption:is(:not(:empty))')
   if (caption != null && article.classList.contains('text-post')) {
      // if content exists
      if (npf.trail.length || npf.content.length) {
          // assign various post types based on NPF data
            switch (npf.trail[0]?.content[0]?.type ?? npf.content[0].type) {
            case 'image':
               updateTypes('photos', article)
               if (article.querySelector('.npf_row') == null) {
                  caption.prepend(article.querySelector('figure'))
               }
               break
            case 'video':
               updateTypes('video', article)
               let video = article.querySelector('figure')
               caption.prepend(video)
               break
            case 'link':
              updateTypes('link', article)
            case 'audio':
               updateTypes('audio', article)
                break
            case 'quote':
                updateTypes('quote', article)
            }
          
         // if there are photos
         if (article.classList.contains('photos-post')) {
            let photoset = document.createElement('div')
            photoset.classList.add('npf-photos')
            caption.prepend(photoset)
            // find where a photoset would be split up by another content block
            let photoBreak = article.querySelector('.reblog-content p, .reblog-content h1, .reblog-content h2')
            let elements = []
            if (photoBreak) {
               let prevElement = photoBreak.parentNode.firstElementChild
               while (prevElement !== photoBreak) {
                  elements.push(prevElement)
                  prevElement = prevElement.nextElementSibling
               }
            }
            // if there is nothing that breaks up the photoset, select all rows
            else {
               elements = article.querySelectorAll('.npf_row')
            }
            // move each row to the top
            for (const el of elements) {
               photoset.append(el)
            }
            if (article.querySelectorAll('.npf_row').length > 1) {
                updateTypes('photoset', article)
            }
            else {
                updateTypes('photo', article)
            }
         }
         
         // clean up any potential stray reblog headers
         let reblogHeader = article.querySelector('.reblog-header')
         let reblogContent = article.querySelector('.reblog-content')
         if (reblogHeader?.nextElementSibling === reblogContent && reblogContent?.childElementCount === 0) {
            reblogHeader.remove()
            reblogContent.remove()
         }
      }
   }
}
