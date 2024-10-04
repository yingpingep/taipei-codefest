import requests
from bs4 import BeautifulSoup
import json

def extract_data_from_url(url):
    """
    Extracts data from a given URL and returns it as a dictionary.

    Args:
    url (str): The URL of the webpage to scrape.

    Returns:
    dict: A dictionary containing the extracted data.
    """
    # Send an HTTP request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'lxml')
        
        # Initialize data dictionary
        data = {}

        def extract_p_elements(soup):
            # Find all <p> elements
            p_elements = soup.find_all('p')
            
            for p in p_elements:
                # Find the parent element which might contain the relevant <span>
                parent = p.find_parent()
                if parent:
                    # Find all previous siblings of the parent until we find a <span>
                    span = None
                    for sibling in parent.find_all_previous():
                        if sibling.name == 'span':
                            span = sibling
                            break
                    
                    # Use the <span> text as the key if it exists
                    if span:
                        key = span.get_text(strip=True)
                        value = p.get_text(strip=True)
                        
                        # Add to the dictionary
                        data[key] = value
            
            return data

        # Extract data
        extracted_data = extract_p_elements(soup)
        return extracted_data
    else:
        return {"error": f"Failed to retrieve the webpage. Status code: {response.status_code}"}

def create_output_json(input_data):
    """
    Creates a JSON object with the title as the key and the extracted data as the value.

    Args:
    input_data (dict): A dictionary with titles as keys and URLs as values.

    Returns:
    dict: A dictionary containing the titles and the extracted data.
    """
    output_json = {}
    
    for title, url in input_data.items():
        # Extract data from the URL
        json_result = extract_data_from_url(url)
        print(json_result)
        
        # Add to the output JSON with title as the key
        output_json[title] = json_result
    
    return output_json

def save_json_to_file(data, filename):
    """
    Saves the given data to a JSON file.

    Args:
    data (dict): The data to be saved.
    filename (str): The name of the file to save the data to.
    """
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Example usage with your input data
input_data = {
"臺北市政府失智症服務網": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=E543F9F68FA01B1C",
"河濱公園": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=29BD10D365AC27AC",
"友善無礙通用計程車": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=875A862E146ECC59",
"高齡友善公車候車亭": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=52A138D5B6CBCE6D",
"低地板公車": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=DA8D2ED92AAFC60B",
"登山步道": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=5EC118ED0AB1F731",
"臺北市社會福利主題地圖": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=0ECD62189D2247C9",
"高齡友善健康服務中心": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8D53E2B63D827045",
"申請社區式長照服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=45451022828DCA0D",
"申請居家式長照服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=E35D62009C0D74F9",
"身體照顧、日常生活照顧及家事服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=312DE85996314499",
"老人收容安置補助計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=C08A714D61E71B97",
"喘息服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=9414E2DCB8935074",
"社區復健計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=D722C5F4DB7F2931",
"二手輔具借用服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8E8323643A3A2642",
"長期照顧輔具服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=AF4C9A6B51CC36BD",
"身心障礙者輔具費用補助": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=998ADEAE1FCBCAD2",
"中低收入老人特別照顧津貼": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=451E3C675205415B",
"老人長照機構(住宿式)": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=1EC6C184C82369B1",
"中低老人住宅修繕": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=C6ED3D0A23A2E4BB",
"臺北扶老軟硬兼施": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=3BC075A576E8BA79",
"失智共同照護中心及失智社區服務據點": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=C7C36A9F15A8F906",
"公費安養": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=6D1FCCF12C2A6CC2",
"自費安養": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=B497437BA6909551",
"家庭托顧": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=86E1054BB6FE88F7",
"失能者營養餐飲服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8770E261DB7F8284",
"長期照顧交通接送服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=CD98F587E86EEF72",
"小規模多機能服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=415F60F997564A13",
"住院看護補助": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=46DFDD2811FCC6DD",
"高齡友善就醫環境": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=E416BF97DBFF566D",
"社區安寧照護服務計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=76661A687A32A751",
"老人日間照顧": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=7DAFB216F86A9877",
"高齡社會地政貼心服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=F30E38E73735381D",
"失智症篩檢及確診評估補助計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=54B42B9A49DD92B8",
"獨居老人服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=64A03C6C8512A59F",
"走失手鍊": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=94C6526A7556C567",
"長青樂活遊臺北": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=F84F08A40CE62CB5",
"文康休閒場館": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=65B898C61B0E53AB",
"敬老卡擴大使用": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=AABDCEAF48292050",
"老人服務中心": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=49BB913FF178DB1D",
"社團活動": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=A6FBFC05F57794B6",
"社區營養推廣中心": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=5D3FF382174A3F80",
"社區慢性病個案管理": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=9A89CBB2EBB3C95F",
"老人健康檢查及保健服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=2584A84F2EEFCF4C",
"公費肺炎鏈球菌疫苗": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=452652C125EC68A9",
"公費流感疫苗": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=EF3447ECB2F1B48F",
"受理社會住宅申租": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=FF609721390998F6",
"青銀共居": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=694DDA4DEF5A33BE",
"社區照顧關懷據點": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=30D28BB0892BB6BD",
"醫療服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=7B3C30D13AD86595",
"租屋補助": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=3479334D2EEA4D16",
"臺北市市民醫療補助": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=AC45ED02C02A074D",
"中低收入老人生活津貼": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=FE1CB1C0396CD79B",
"老人住宅": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8ABA422AD4C1D939",
"家庭責任醫師居家醫療": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=33E04D8022F769B4",
"老人受虐通報": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=DCBF1845088EDAD7",
"中低收入老人補助裝置假牙及維修": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=07CABA87A60E8B1C",
"委託獨居長者緊急救援系統服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=F8EEC97ACC0DBD5E",
"慈悲關懷社區宣導與推廣計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=57F61777E4BC450F",
"出院準備服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8AF74E97F2FB8397",
"老人健保自付額補助": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=8276CE64808CFAAF",
"運動中心": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=304898E7F6D6F6BE",
"中高齡就業博覽會": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=CDEED443A06C236F",
"中高齡者職務再設計": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=5E656B019F621E04",
"職場學習及再適應計畫": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=CDEC875EDA43F604",
"臺北市特定對象失業者穩定就業補助辦法": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=AD68043762E2FE55",
"銀髮人才就業諮詢站": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=2AA8C618C7081DB1",
"樂齡學習中心與樂齡學堂": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=D0A628E7AB8D31AE",
"原住民長青樂活服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=82B6A1EC134EC509",
"志願服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=FE638B2D4574FC58",
"銀髮貴人薪傳服務": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=523755B91D7F0E0F",
"樂齡運動巡迴指導團": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=AFFA091B2F8535E8",
"長青學苑": "https://elders.gov.taipei/News_Content.aspx?n=9C14AA08DBB34EB9&sms=21884AF41A49B03F&s=FF34E1BDB835D52E"
}


# Generate output JSON
output_result = create_output_json(input_data)

# Save the result to result.json
save_json_to_file(output_result, 'result.json')