/**
 * Replace dw_mediamanager's "insert" function with this modified one 
 */
if ( typeof dw_mediamanager !== 'undefined' ) {
	/**
     * Insert the clicked image into the opener's textarea
     *
     * @author Andreas Gohr <andi@splitbrain.org>
     * @author Dominik Eckelmann <eckelmann@cosmocode.de>
     * @author Pierre Spring <pierre.spring@caillou.ch>
     */
    dw_mediamanager.insert = function (id) {
        var opts, alignleft, alignright, edid, s, pxsize;

        // set syntax options
        dw_mediamanager.$popup.dialog('close');

        opts = '';
        alignleft = '';
        alignright = '';

        if ({img: 1, swf: 1}[dw_mediamanager.ext] === 1) {

            if (dw_mediamanager.link === '4') {
                    opts = '?linkonly';
            } else {

                if (dw_mediamanager.link === "3" && dw_mediamanager.ext === 'img') {
                    opts = '?nolink';
                } else if (dw_mediamanager.link === "2" && dw_mediamanager.ext === 'img') {
                    opts = '?direct';
                }

                s = parseInt(dw_mediamanager.size, 10);

                if (s && s >= 1 && s < 4) {
                    pxsize = parseInt(JSINFO.customimagesizes[dw_mediamanager.size], 10);

                    if (!isNaN(pxsize) && pxsize > 0) {
                        opts += (opts.length)?'&':'?';
                        opts += String(pxsize);
                        
                        if (dw_mediamanager.ext === 'swf') {
                            opts += 'x' + String(Math.round(pxsize / 1.62));
                        }
                    }
                }
                if (dw_mediamanager.align !== '1') {
                    alignleft = dw_mediamanager.align === '2' ? '' : ' ';
                    alignright = dw_mediamanager.align === '4' ? '' : ' ';
                }
            }
        }
        edid = String.prototype.match.call(document.location, /&edid=([^&]+)/);
        opener.insertTags(edid ? edid[1] : 'wiki__text',
                          '{{'+alignleft+id+opts+alignright+'|','}}','');

        if(!dw_mediamanager.keepopen) {
            window.close();
        }
        opener.focus();
        return false;
    };
}