// For implementing google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-171409849-2', 'auto');
    ga('send', 'pageview');

var PDFfile = "noticeOne.pdf";
var li =  document.getElementsByClassName("pdf-button")
for(i = 0; i<li.length;i++){
    let item = li[i];
    item.addEventListener('click',() => {
        if (item.classList.contains("pdf-button-one")){
            PDFfile = "noticeOne.pdf";
        }else if(item.classList.contains("pdf-button-two")){
            PDFfile = "noticeTwo.pdf";
        }else if(item.classList.contains("pdf-button-three")){    
            PDFfile = "noticeThree.pdf";
        }else if(item.classList.contains("pdf-button-four")){            
            PDFfile = "noticeFour.pdf";
        }else if(item.classList.contains("pdf-button-five")){           
            PDFfile = "noticeFive.pdf";
        }else{
            PDFfile = "noticeOne.pdf";
        }
        localStorage.setItem("pdfName",PDFfile);
            window.open(
                "notice.html",
                '_blank' 
              );     
    });
}

//set custom options
const viewerConfig = {
    defaultViewMode: "FIT_PAGE",  //default mode is set to fit_page
    embedMode: "SIZED_CONTAINER",     //display mode is set to inline
    showPageControls : true,  //display controls
    dockPageControls:true, //user can dock/undock
    showAnnotationTools: true, //display annotation tools
    showDownloadPDF : true,  //display download option
    showPrintPDF:true,  //display print option
    showLeftHandPanel: false   
};

if(document.querySelectorAll(".adobe-dc-view").length !== 0){
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
        var adobeDCView = new AdobeDC.View({
            /* Pass your registered client id */
            clientId: "096b097fc7284678a650f6f37265c528",   //use your View Client Id
            /* Pass the div id in which PDF should be rendered */
            divId: "adobe-dc-view",
        });
        adobeDCView.previewFile({
            /* Pass information on how to access the file */
            content: {
                //Location of PDF
                location: {
                    url: "./resources/"+ localStorage.getItem("pdfName") ,
                },
            },
            /* Pass meta data of file */
            metaData: {
                /* file name */
                fileName: localStorage.getItem("pdfName")
            }
        }, viewerConfig);

        adobeDCView.registerCallback(
            AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
            function (event) {
                switch(event.type){
                    case 'DOCUMENT_OPEN': ga('send', 'event', 'OPEN_DOCUMENT', event.data.fileName, 'open document');
                    break;
                    case 'PAGE_VIEW' : ga('send', 'event', 'PAGE_VIEW', `${event.data.pageNumber} of ${event.data.fileName}`, 'view page');
                    break;
                    case 'TEXT_SEARCH' : ga('send', 'event', 'TEXT_SEARCH', `${event.data.searchedText} in ${event.data.fileName}`, 'search text');
                    break;
                    case 'DOCUMENT_PRINT' : ga('send', 'event', 'DOCUMENT_PRINT', event.data.fileName, 'print document'); 
                    break;
                    case 'DOCUMENT_DOWNLOAD': ga('send', 'event', 'DOCUMENT_DOWNLOAD', event.data.fileName, 'download document'); 
                    break;
                    case 'TEXT_COPY': ga('send', 'event', 'TEXT_COPY', `${event.data.copiedText} from ${event.data.fileName}`, 'copy text');
                    break;
                    default: ;
                }
            },
            {
                enablePDFAnalytics: true 
            }
        );
    });
}

