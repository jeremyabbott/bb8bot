using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace test
{
    public class Startup
    {
        public async Task<object> Invoke(object input)
        {
            return this.Hello();
        }

        string Hello()
        {
            return "Hello from the other side";
        }
    }
}
